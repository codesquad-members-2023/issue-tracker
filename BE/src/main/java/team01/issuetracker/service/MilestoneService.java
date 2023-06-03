package team01.issuetracker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team01.issuetracker.domain.Issue;
import team01.issuetracker.domain.Milestone;
import team01.issuetracker.repository.IssueRepository;
import team01.issuetracker.repository.LabelRepository;
import team01.issuetracker.repository.MilestoneRepository;
import team01.issuetracker.service.dto.response.MilestoneDTO;
import team01.issuetracker.service.dto.response.MilestoneResponseDTO;
import team01.issuetracker.service.vo.Count;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final IssueRepository issueRepository;
    private final LabelRepository labelRepository;

    public MilestoneResponseDTO getMilestone(boolean status) {
        int openMilestoneCount = milestoneRepository.countByIsOpen(true);
        int closedMilestoneCount = milestoneRepository.countByIsOpen(false);

        Count count = Count.builder()
                .label((int) labelRepository.count())
                .milestone(openMilestoneCount)
                .opened(openMilestoneCount)
                .closed(closedMilestoneCount)
                .build();

        List<MilestoneDTO> milestones = milestoneRepository.findAllByIsOpen(status).stream()
                .map(m -> MilestoneDTO.of(m, issueRepository.countByIsOpenAndMilestoneId(true, m.getId()), issueRepository.countByIsOpenAndMilestoneId(false, m.getId())))
                .collect(Collectors.toList());


        return MilestoneResponseDTO.builder()
                .count(count)
                .milestones(milestones)
                .build();
    }

    public void create(MilestoneDTO milestoneDTO) {
        milestoneRepository.save(Milestone.create(milestoneDTO));
    }

    public void update(MilestoneDTO milestoneDTO, Long milestoneId) {
        Milestone milestone = findMilestoneById(milestoneId);

        milestone.update(milestoneDTO);

        milestoneRepository.save(milestone);
    }

    public void stateChanges(Long milestoneId) {
        Milestone milestone = findMilestoneById(milestoneId);

        milestone.statusUpdate();

        milestoneRepository.save(milestone);
    }

    // 로직의 문제... 다음엔 IssueMilestone 테이블을 만들자 ㅠ
    public void delete(Long milestoneId) {
        Milestone milestone = findMilestoneById(milestoneId);
        List<Issue> issues = milestone.getIssues();

        for (Issue issue : issues) {
            issue.setMilestoneId(null);
        }

        issueRepository.saveAll(issues);
        milestoneRepository.delete(milestone);
    }

    public Milestone findMilestoneById(Long milestoneId) {
        return milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new RuntimeException("해당 마일스톤을 찾을 수 없습니다."));
    }

}

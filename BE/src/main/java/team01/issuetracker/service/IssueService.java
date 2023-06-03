package team01.issuetracker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team01.issuetracker.domain.*;
import team01.issuetracker.repository.IssueRepository;
import team01.issuetracker.repository.LabelRepository;
import team01.issuetracker.repository.MemberRepository;
import team01.issuetracker.repository.MilestoneRepository;
import team01.issuetracker.service.dto.request.FilterRequestDTO;
import team01.issuetracker.service.dto.request.IssueRequestDTO;
import team01.issuetracker.service.dto.response.*;
import team01.issuetracker.service.vo.Count;
import team01.issuetracker.service.vo.MiniLabel;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssueService {
    private final IssueRepository issueRepository;
    private final MemberRepository memberRepository;
    private final LabelRepository labelRepository;
    private final MilestoneRepository milestoneRepository;

    public IssuesResponseDTO getIssues(FilterRequestDTO requestDTO) {
        Count count = Count.builder() // 필터에 따라서 값이 바뀜
                .label((int) labelRepository.count())
                .milestone(milestoneRepository.countByIsOpen(true))
                .opened(issueRepository.countByIsOpen(true))
                .closed(issueRepository.countByIsOpen(false))
                .build();

        //맴버 전체 조회
        Map<Long, Member> members = memberRepository.findAll().stream()
                .collect(Collectors.toMap(Member::getId, member -> member));
        //레이블 전체 조회
        Map<Long, Label> labels = labelRepository.findAll().stream()
                .collect(Collectors.toMap(Label::getId, label -> label));
        //마일스톤 전체 조회
        Map<Long, Milestone> milestones = milestoneRepository.findAll().stream()
                .collect(Collectors.toMap(Milestone::getId, milestone -> milestone));

        //issue -> issueResponseDTO로 변환
        List<IssueResponseDTO> issues = issueRepository.findAllByFilter(requestDTO.getIsOpen(), requestDTO.getMilestones(), requestDTO.getLabels(), requestDTO.getAssignees(), requestDTO.getWriters()).stream()
                .map(issue -> IssueResponseDTO.of(issue,
                        members.get(issue.getWriterId().getId()),
                        issue.getMilestoneId() == null ? "" : milestones.get(issue.getMilestoneId().getId()).getTitle(),
                        issue.getIssueLabels().stream().map(il -> MiniLabel.of(labels.get(il.getLabelId()))).collect(Collectors.toList())))
                .collect(Collectors.toList());

        return IssuesResponseDTO.of(count, issues);
    }

    public Long create(IssueRequestDTO issueDTO) {
        Issue issue = Issue.create(
                issueDTO.getWriterId(),
                issueDTO.getTitle(),
                issueDTO.getDescription(),
                issueDTO.getFileUrl(),
                issueDTO.getMilestoneId()
        );

        Set<Assignee> assigneeList = issueDTO.getAssigneeIds().stream()
                .filter(Objects::nonNull)
                .map(assigneeId -> Assignee.builder()
                        .memberId(assigneeId)
                        .issueId(issue.getId())
                        .build())
                .collect(Collectors.toSet());
        issue.setAssignees(assigneeList);

        Set<IssueLabel> issueLabelList = issueDTO.getLabelIds().stream()
                .map(labelId -> IssueLabel.builder()
                        .labelId(labelId)
                        .issueId(issue.getId())
                        .build())
                .collect(Collectors.toSet());
        issue.setIssueLabels(issueLabelList);

        issueRepository.save(issue);
        return issue.getId();
    }

    public IssueDetailResponseDTO getIssue(Long id) {
        Issue issue = issueRepository.findById(id).orElseThrow();

        MilestoneDTO issueMilestone = null;
        //마일스톤 정보 조회 (1개만 존재)
        if (issue.getMilestoneId() != null) {
            Milestone milestone = milestoneRepository.findById(issue.getMilestoneId().getId()).orElseThrow();
            int openIssueCount = issueRepository.countByIsOpenAndMilestoneId(true, milestone.getId());
            int closedIssueCount = issueRepository.countByIsOpenAndMilestoneId(false, milestone.getId());
            issueMilestone = MilestoneDTO.of(milestone, openIssueCount, closedIssueCount);
        }

        //맴버 전체 조회
        Map<Long, Member> members = memberRepository.findAll().stream()
                .collect(Collectors.toMap(Member::getId, member -> member));
        //레이블 전체 조회
        Map<Long, Label> labels = labelRepository.findAll().stream()
                .collect(Collectors.toMap(Label::getId, label -> label));

        //해당 라벨
        List<LabelDTO> issueLabels = issue.getIssueLabels().stream()
                .map(il -> LabelDTO.of(labels.get(il.getLabelId())))
                .collect(Collectors.toList());

        //해당 작성자
        Member writer = members.get(issue.getWriterId().getId());

        List<MemberDTO> assignees = issue.getAssignees().stream()
                .map(a -> MemberDTO.of(members.get(a.getMemberId())))
                .collect(Collectors.toList());

        return IssueDetailResponseDTO.of(issue, writer, issueMilestone, issueLabels, assignees);
    }
}

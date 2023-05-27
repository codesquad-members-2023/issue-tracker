package team01.issuetracker.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import team01.issuetracker.domain.Issue;
import team01.issuetracker.domain.Label;
import team01.issuetracker.domain.Member;
import team01.issuetracker.domain.Milestone;
import team01.issuetracker.repository.IssueRepository;
import team01.issuetracker.repository.LabelRepository;
import team01.issuetracker.repository.MemberRepository;
import team01.issuetracker.repository.MilestoneRepository;
import team01.issuetracker.service.vo.Count;
import team01.issuetracker.service.vo.MiniLabel;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Transactional
@SpringBootTest
@Sql("/test-schema.sql")
@Sql("/test-data.sql")
class IssueServiceTest {
    @Autowired
    IssueRepository issueRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    LabelRepository labelRepository;
    @Autowired
    MilestoneRepository milestoneRepository;

    @DisplayName("openIssue일 때 이슈, 라벨, 멤버들 정보 만들기.. 했습니다.. 어떻게 테스트를 확인해야할까요..")
    @Test
    void issueResponseDTO() {
        Count count = Count.builder() // 임시 값(명세서)
                .label(4)
                .milestone(2)
                .opened(2)
                .closed(2)
                .build();

        List<Issue> issues = issueRepository.findAllByIsOpen(true);
        //맴버 전체 조회
        Map<Long, Member> members = memberRepository.findAll().stream()
                .collect(Collectors.toMap(Member::getId, member -> member));
        //        List<Member> assignees = issues.stream().map(Issue::getAssignees).flatMap(Collection::stream)
//                .map(m -> members.get(m.getMemberId()))
//                .collect(Collectors.toList());

//        List<String> assignees = issues.stream().map(Issue::getAssignees)
//                .flatMap(Collection::stream)
//                .map(m -> members.get(m.getMemberId()).getName())
//                .collect(Collectors.toList());
        //레이블 전체 조회
        Map<Long, Label> labels = labelRepository.findAll().stream()
                .collect(Collectors.toMap(Label::getId, label -> label));

        issues.stream().map(issue -> issue.getIssueLabels())
                .forEach(m -> System.out.println(m));

        List<List<MiniLabel>> issueLabels = issues.stream().map(issue -> issue.getIssueLabels())
                .map(issueLabelList -> issueLabelList.stream().map(l -> MiniLabel.of(labels.get(l.getLabelId()))).collect(Collectors.toList()))
                .collect(Collectors.toList());


        //작성자 전체 조회
        List<Member> writers = issues.stream().map(writer -> writer.getMemberId().getId())
                .map(l -> members.get(l))
                .collect(Collectors.toList());
        //마일스톤 전체 조회
        Map<Long, Milestone> milestones = milestoneRepository.findAll().stream()
                .collect(Collectors.toMap(Milestone::getId, milestone -> milestone));

        //Todo: 마일스톤 없을 때 nullpointexception 에러 해결하기
        List<String> issueMilestones = issues.stream().map(m -> m.getMilestoneId() == null ? 0 : m.getMilestoneId().getId())
                .map(m -> (m == 0) ? "" : milestones.get(m).getTitle())
                .collect(Collectors.toList());

    }
}

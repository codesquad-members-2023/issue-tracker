package com.example.be.issue;


import com.example.be.issue.dto.CountDTO;
import com.example.be.issue.dto.IssueCreateFormDTO;
import com.example.be.issue.dto.IssueNumberWithLabelDTO;
import com.example.be.issue.dto.IssueSearchCondition;
import com.example.be.label.Label;
import com.example.be.label.LabelRepository;
import com.example.be.milestone.Milestone;
import com.example.be.milestone.MilestoneRepository;
import com.example.be.user.User;
import com.example.be.user.UserRepository;
import com.example.be.util.Paging;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
@SpringBootTest
class IssueRepositoryTest {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private LabelRepository labelRepository;

    @Nested
    @DisplayName("List<Labels> 를 채우지 않고 DB로 부터 데이터를 불러와 List<Issue> 목록을 필터링해 반환한다.")
    class FindAllIssuesWithoutLabels {

        @Test
        @DisplayName("필터 조건이 없는 경우, 모든 이슈 목록들을 반환한다.") //TODO : 이슈를 닫는 기능을 구현하여 테스트 코드를 완성한다.
        void allIssues() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", null, null, null);
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용", null, null, null);
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", null, null, null);
            issueCreateFormDTO3.setUserId("1234");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(3);
        }

        @Test
        @DisplayName("열린 이슈들로만 이루어진 목록을 반환한다.")
        void openIssues() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", null, null, null);
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용", null, null, null);
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", null, null, null);
            issueCreateFormDTO3.setUserId("1234");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(3);
        }

        @Test
        @DisplayName("글 작성자 (닉네임)를 기준으로 필터링한 목록을 반환한다.")
        void issuesFilteredByAuthor() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));
            userRepository.save(new User("5678", "codesquad", "FE", "img"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", null, null, null);
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용", null, null, null);
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", null, null, null);
            issueCreateFormDTO3.setUserId("5678");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();
            issueSearchCondition.setAuthor("1234");

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(2);
        }

        @Test
        @DisplayName("마일스톤 이름울 기준으로 필터링한 목록을 반환한다.")
        void issuesFilteredByMilestone() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));
            milestoneRepository.save(new Milestone("TEST", LocalDateTime.now(), "테스트용 마일스톤"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", null, "TEST", null);
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용", null, "TEST", null);
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", null, null, null);
            issueCreateFormDTO3.setUserId("1234");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();
            issueSearchCondition.setMilestoneName("TEST");

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(2);
        }

        @Test
        @DisplayName("milestoneName = $none 일 경우 마일스톤이 없는 이슈만 필터링한 목록을 반환한다.")
        void issueFilteredByNoMilestone() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));
            milestoneRepository.save(new Milestone("TEST", LocalDateTime.now(), "테스트용 마일스톤"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", null, "TEST", null);
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용", null, "TEST", null);
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", null, null, null);
            issueCreateFormDTO3.setUserId("1234");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();
            issueSearchCondition.setMilestoneName("$none");

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(1);
        }

        @Test
        @DisplayName("이슈에 담당된 유저의 아이디를 기준으로 필터링한 목록을 반환한다.")
        void issuesFilteredByAssignee() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));
            userRepository.save(new User("hyun", "codesquad", "hh", "mockii.img"));
            userRepository.save(new User("yoon", "codesquad", "hy", "mock.img"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", List.of("hyun"), null, null);
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용",  List.of("yoon"), null, null);
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", List.of("hyun", "yoon"), null, null);
            issueCreateFormDTO3.setUserId("1234");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();
            issueSearchCondition.setAssignees(List.of("hyun"));

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(2);
        }

        @Test
        @DisplayName("assignees = $none 일 경우 담당 유저가 없는 이슈만 필터링한 목록을 반환한다.")
        void issuesFilteredByNoAssignee() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));
            userRepository.save(new User("hyun", "codesquad", "hh", "mockii.img"));
            userRepository.save(new User("yoon", "codesquad", "hy", "mock.img"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", List.of("hyun"), null, null);
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용",  List.of("yoon"), null, null);
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", null, null, null);
            issueCreateFormDTO3.setUserId("1234");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();
            issueSearchCondition.setAssignees(List.of("$none"));

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(1);
        }

        @Test
        @DisplayName("이슈에 붙은 라벨 이름을 기준으로 필터링한 목록을 반환한다.")
        void issuesFilteredByLabelNames() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));
            labelRepository.save(new Label("feature", "기능 구현", "#000000", "#111111"));
            labelRepository.save(new Label("fix", "버그 수정", "#000000", "#111111"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", null, null, List.of("feature"));
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용",  null, null, List.of("fix"));
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", null, null, List.of("feature", "fix"));
            issueCreateFormDTO3.setUserId("1234");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();
            issueSearchCondition.setLabelNames(List.of("feature", "fix"));

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(1);
        }

        @Test
        @DisplayName("labelNames = $none 일 경우 라벨이 없는 이슈만 필터링한 목록을 반환한다.")
        void issuesFilteredByNoLabels() {
            // given
            userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));
            labelRepository.save(new Label("feature", "기능 구현", "#000000", "#111111"));
            labelRepository.save(new Label("fix", "버그 수정", "#000000", "#111111"));

            IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", null, null, List.of("feature"));
            issueCreateFormDTO1.setUserId("1234");
            issueRepository.save(issueCreateFormDTO1);

            IssueCreateFormDTO issueCreateFormDTO2= new IssueCreateFormDTO("제목 2", "두 번째 이슈 내용",  null, null, List.of("fix"));
            issueCreateFormDTO2.setUserId("1234");
            issueRepository.save(issueCreateFormDTO2);

            IssueCreateFormDTO issueCreateFormDTO3 = new IssueCreateFormDTO("제목 3", "세 번째 이슈 내용", null, null, null);
            issueCreateFormDTO3.setUserId("1234");
            issueRepository.save(issueCreateFormDTO3);

            IssueSearchCondition issueSearchCondition = getFirstPage();
            issueSearchCondition.setLabelNames(List.of("$none"));

            // when
            List<Issue> issuesWithoutLabels = issueRepository.findIssuesWithoutLabelsBy(issueSearchCondition);

            // then
            assertThat(issuesWithoutLabels.size()).isEqualTo(1);
        }

        private IssueSearchCondition getFirstPage() {
            Paging paging = new Paging(1, 3);
            IssueSearchCondition issueSearchCondition = new IssueSearchCondition();
            issueSearchCondition.setStartIndex(paging.getStartIndex());
            issueSearchCondition.setCntPerPage(paging.getCntPerPage());
            return issueSearchCondition;
        }
    }

    @Test
    @DisplayName("Issue의 PK값과 대응되는 Label 객체를 가지는 List<IssueLabelMap> 목록을 반환한다.")
    void findAllIssueLabelMaps() {
        // given
        Label label1 = new Label("feature", "기능 구현", "#000000", "#111111");
        Label label2 = new Label("fix", "버그 수정", "#000000", "#111111");
        userRepository.save(new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg"));
        labelRepository.save(label1);
        labelRepository.save(label2);

        IssueCreateFormDTO issueCreateFormDTO1 = new IssueCreateFormDTO("제목 1", "첫 번째 이슈 내용", null, null, List.of("feature", "fix"));
        issueCreateFormDTO1.setUserId("1234");
        int savedNumber = issueRepository.save(issueCreateFormDTO1);

        // when
        List<IssueNumberWithLabelDTO> issueNumberWithLabelDTOS = issueRepository.findIssueLabelMapsBy(Set.of(savedNumber));

        // then
        assertThat(issueNumberWithLabelDTOS.size()).isEqualTo(2);
        assertThat(issueNumberWithLabelDTOS.stream()
                .map(il -> il.getLabel())
                .collect(Collectors.toList())).usingRecursiveFieldByFieldElementComparator().containsExactlyInAnyOrder(label1, label2);
    }
}

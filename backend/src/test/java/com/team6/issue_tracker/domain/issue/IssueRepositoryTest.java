package com.team6.issue_tracker.domain.issue;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@Slf4j
@DataJdbcTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class IssueRepositoryTest {

    @Autowired
    IssueRepository issueRepository;

    @Test
    @DisplayName("전체 이슈를 조회할 수 있다.")
    public void findAll() throws Exception{
        //when
        Iterable<Issue> all = issueRepository.findAll();

        //then
        assertThat(all).hasSize(4);
    }

    @Test
    @DisplayName("삭제되지 않고, 열린 상태인 이슈를 조회할 수 있다.")
    public void findAllNotDeletedIsOpenIssues() throws Exception{
        //given
        PageRequest page = PageRequest.of(0,10, Sort.by(Sort.Direction.DESC, "issue_idx"));

        //when
        Page<Issue> issues = issueRepository.findAllByIsDeletedAndIsOpen(false, true, page);

        //then
        assertThat(issues).hasSize(1);
    }

    @Test
    @DisplayName("삭제되지 않고, 열린 상태인 이슈를 페이지 크기 3인 첫번째 페이지를 조회할 수 있다.")
    public void findAllNotDeletedIsOpenIssuesWithPage() throws Exception{
        //given
        PageRequest page = PageRequest.of(0,3, Sort.Direction.DESC, "issue_idx");

        //when
        Page<Issue> issues = issueRepository.findAllByIsDeletedAndIsOpen(false, true, page);

        //then
        assertThat(issues).hasSize(1);
    }

    @Test
    @DisplayName("필터가 있는 경우, 조건에 맞는 issue를 조회할 수 있다.")
    public void findWithFilter() throws Exception{
        PageRequest page = PageRequest.of(1,1, Sort.by(Sort.Direction.DESC, "issue_idx"));
        //when
        List<Issue> allByFilter = issueRepository.findAllBy(true, null, 2L, null, null, 20, 1);

        //then
        assertThat(allByFilter).hasSize(1);
    }

    @Test
    @DisplayName("새로운 이슈를 저장할 수 있다.")
    public void saveNewIssue() throws Exception {
        long before = issueRepository.count();

        Issue newIssue = Issue.builder()
                .writer(AggregateReference.to(1L))
                .title("새로 저장하는 이슈")
                .contents("새로 저장하는 이슈의 내용")
                .createdAt(Instant.now())
                .isOpen(true)
                .isDeleted(false)
                .labelOnIssue(Map.of(1L, new Labeling(1L)))
                .build();

        Issue save = issueRepository.save(newIssue);

        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(save.getIssueIdx()).isNotNull();
            softly.assertThat(save.getContents()).isEqualTo(newIssue.getContents());
            softly.assertThat(issueRepository.count()).isEqualTo(before+1);
        });
    }

    @Test
    @DisplayName("이슈 내용을 수정할 수 있다.")
    public void updateContents() throws Exception{
        //given
        Instant beforeWork = Instant.now();
        Issue issue = issueRepository.findById(1L).orElseThrow();
        Issue updatedIssue = Issue.builder()
                .issueIdx(issue.getIssueIdx())
                .title(issue.getTitle())
                .contents("수정된 내용입니다")
                .writer(issue.getWriter())
                .assignee(issue.getAssignee())
                .createdAt(issue.getCreatedAt())
                .milestoneIdx(issue.getMilestoneIdx())
                .labelOnIssue(issue.getLabelOnIssue())
                .editedAt(Instant.now())
                .isOpen(issue.getIsOpen())
                .isDeleted(issue.getIsDeleted())
                .build();

        //when
        Issue save = issueRepository.save(updatedIssue);

        //then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(save.getContents()).isEqualTo(updatedIssue.getContents());
            softly.assertThat(save.getIssueIdx()).isEqualTo(issue.getIssueIdx());
            softly.assertThat(save.getCreatedAt()).isEqualTo(issue.getCreatedAt());
            softly.assertThat(save.getEditedAt()).isAfter(beforeWork);
        });
    }
}

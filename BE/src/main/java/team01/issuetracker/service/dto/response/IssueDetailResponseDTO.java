package team01.issuetracker.service.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import team01.issuetracker.domain.Issue;
import team01.issuetracker.domain.Member;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Getter
@Builder
public class IssueDetailResponseDTO {
    private final Long id;
    private final String title;
    private final boolean status;
    private final String description;
    private final LocalDateTime createDateTime;
    private final List<LabelDTO> labels;
    private final MilestoneDTO milestone;
    private final MemberDTO writer;
    private final List<MemberDTO> assignees;

    public static IssueDetailResponseDTO of(Issue issue, Member writer, MilestoneDTO milestone, List<LabelDTO> labels, List<MemberDTO> assignees) {
        return IssueDetailResponseDTO.builder()
                .id(issue.getId())
                .title(issue.getTitle())
                .status(issue.isOpen())
                .description(issue.getDescription())
                .createDateTime(issue.getCreateAt())
                .labels(labels)
                .milestone(milestone)
                .writer(MemberDTO.of(writer))
                .assignees(assignees)
                .build();
    }
}

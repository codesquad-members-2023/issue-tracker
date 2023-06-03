package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.domain.Milestone;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class MilestoneDTO {

    private final Long id;
    private final String title;
    private final String description;
    private final LocalDate dueDate;
    private final int openIssueCount;
    private final int closedIssueCount;

    public static MilestoneDTO of(Milestone milestone, int openIssueCount, int closedIssueCount) {
        return MilestoneDTO.builder()
                .id(milestone.getId())
                .title(milestone.getTitle())
                .description(milestone.getDescription())
                .dueDate(milestone.getDueDate())
                .openIssueCount(openIssueCount)
                .closedIssueCount(closedIssueCount)
                .build();
    }
}

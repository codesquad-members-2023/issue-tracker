package team01.issuetracker.service.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class MilestoneVO {
    private final Long id;
    private final String title;
    private final String description;
    private final LocalDate dueDate;
    private final Long openedIssue;
    private final Long closedIssue;
}

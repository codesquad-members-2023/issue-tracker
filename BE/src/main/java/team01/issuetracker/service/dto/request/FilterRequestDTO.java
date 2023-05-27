package team01.issuetracker.service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FilterRequestDTO {
    private final String status;
    private final Long assignee;
    private final Long label;
    private final Long milestone;
    private final Long writers;
}

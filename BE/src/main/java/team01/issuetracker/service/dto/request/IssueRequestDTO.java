package team01.issuetracker.service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class IssueRequestDTO {

    private Long writerId;
    private String title;
    private String description;
    private String fileUrl;
    private List<Long> assigneeIds;
    private List<Long> labelIds;
    private Long milestoneId;
}

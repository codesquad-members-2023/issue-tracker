package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CreateIssueDTO {
    private final Long id;

    public static CreateIssueDTO of(Long id) {
        return CreateIssueDTO.builder()
                .id(id)
                .build();
    }
}

package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.service.vo.Count;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class IssuesResponseDTO {

    private final Count count;
    private final List<IssueResponseDTO> issues;

    public static IssuesResponseDTO of(Count count, List<IssueResponseDTO> issues) {
        return IssuesResponseDTO.builder()
                .count(count)
                .issues(issues)
                .build();
    }

}

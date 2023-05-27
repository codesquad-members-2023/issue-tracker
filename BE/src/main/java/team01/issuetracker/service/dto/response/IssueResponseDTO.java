package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.service.vo.MiniLabel;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class IssueResponseDTO {

    private final Long id;
    private final String title;
    private final LocalDateTime createAt; // 형식이 이상해서 잠시 스트링
    private final List<String> assignees; // 임시 리스트
    private final List<MiniLabel> labels; // 임시 리스트
    private final String milestone;
    private final String author;
    private final String authorUrl;

    public static IssueResponseDTO of(IssueResponseDTO temp) {
        return IssueResponseDTO.builder()
                .id(temp.id)
                .title(temp.title)
                .createAt(temp.createAt)
                .assignees(temp.assignees)
                .labels(temp.labels)
                .milestone(temp.milestone)
                .author(temp.author)
                .authorUrl(temp.authorUrl)
                .build();
    }
}

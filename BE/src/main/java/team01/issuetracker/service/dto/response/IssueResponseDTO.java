package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.domain.Issue;
import team01.issuetracker.domain.Member;
import team01.issuetracker.service.vo.MiniLabel;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class IssueResponseDTO {

    private final Long id;
    private final String title;
    private final String description;
    private final LocalDateTime createAt;
    private final List<MiniLabel> labels;
    private final String milestone;
    private final String author;
    private final String authorUrl;

    public static IssueResponseDTO of(Issue issue, Member writer, String milestone, List<MiniLabel> labels) {
        return IssueResponseDTO.builder()
                .id(issue.getId())
                .title(issue.getTitle())
                .createAt(issue.getCreateAt())
                .description(issue.getDescription())
                .author(writer.getName())
                .authorUrl(writer.getFileURL())
                .milestone(milestone)
                .labels(labels)
                .build();
    }
}

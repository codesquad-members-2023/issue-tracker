package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.domain.Label;

@Getter
@Builder
@AllArgsConstructor
public class LabelDTO {
    private final Long id;
    private final String title;
    private final String description;
    private final String bgColorCode;
    private final String fontColorCode;

    public static LabelDTO of(Label label) {
        return LabelDTO.builder()
                .id(label.getId())
                .title(label.getTitle())
                .description(label.getDescription())
                .bgColorCode(label.getBgColorCode())
                .fontColorCode(label.getFontColorCode())
                .build();
    }
}

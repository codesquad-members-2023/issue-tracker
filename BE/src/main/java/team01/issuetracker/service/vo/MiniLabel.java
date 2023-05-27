package team01.issuetracker.service.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.domain.Label;

@Getter
@Builder
@AllArgsConstructor
public class MiniLabel {
    private final String title;
    private final String bgColorCode;

    public static MiniLabel of(Label label) {
        return MiniLabel.builder()
                .title(label.getTitle())
                .bgColorCode(label.getBgColorCode())
                .build();
    }
}

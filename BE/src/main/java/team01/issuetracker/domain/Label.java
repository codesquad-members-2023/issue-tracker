package team01.issuetracker.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;
import team01.issuetracker.service.dto.response.LabelDTO;

import java.util.ArrayList;
import java.util.List;

@ToString
@Getter
@AllArgsConstructor
@Builder
@Table("label")
public class Label {
    @Id
    @Column("id")
    private Long id;
    @Column("title")
    private String title;
    @Column("description")
    private String description;
    @Column("bg_color_code")
    private String bgColorCode;
    @Column("font_color_code")
    private String fontColorCode;

    @MappedCollection(idColumn = "label_id", keyColumn = "id")
    @Builder.Default
    private List<IssueLabel> issueLabels = new ArrayList<>();

    public static Label create(LabelDTO labelDTO) {
        return Label.builder()
                .title(labelDTO.getTitle())
                .description(labelDTO.getDescription())
                .bgColorCode(labelDTO.getBgColorCode())
                .fontColorCode(labelDTO.getFontColorCode())
                .build();
    }

    public Label update(LabelDTO labelDTO) {
        this.title = labelDTO.getTitle();
        this.description = labelDTO.getDescription();
        this.bgColorCode = labelDTO.getBgColorCode();
        this.fontColorCode = labelDTO.getFontColorCode();
        return this;
    }

}

package team01.issuetracker.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

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

}

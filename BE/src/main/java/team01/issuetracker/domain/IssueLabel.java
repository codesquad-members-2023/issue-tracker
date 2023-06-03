package team01.issuetracker.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@ToString
@Getter
@Setter
@AllArgsConstructor
@Builder
@Table("issue_label")
public class IssueLabel {
    @Id
    @Column("id")
    private Long id;
    @Column("label_id")
    private Long labelId;
    @Column("issue_id")
    private Long issueId;

    public IssueLabel deleteLabel(Label targetLabel) {
        if (targetLabel != null && labelId.equals(targetLabel.getId())) {
            labelId = null;
        }
        return this;
    }
}

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
@Table("assignee")
public class Assignee {
    @Id
    @Column("id")
    private Long id;
    @Column("member_id")
    private Long memberId;
    @Column("issue_id")
    private Long issueId;
}

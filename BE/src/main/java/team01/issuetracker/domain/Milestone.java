package team01.issuetracker.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Date;


@Getter
@AllArgsConstructor
@ToString
@Builder
@Table("milestone")
public class Milestone {
    @Id
    @Column("id")
    private Long id;
    @Column("title")
    private String title;
    @Column("description")
    private String description;
    @Column("is_open")
    private boolean isOpen;
    @Column("due_date")
    private Date dueDate;

}

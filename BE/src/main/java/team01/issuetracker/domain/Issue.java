package team01.issuetracker.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table("issue")
public class Issue {
    @Id //pk 지정
    @Column("id")
    private Long id;
    @Column("writer_id")
    private AggregateReference<Member, @NonNull Long> writerId;
    @Column("title")
    private String title;
    @Column("description")
    private String description;
    @Column("is_open")
    private boolean isOpen;
    @Column("create_date_time")
    private LocalDateTime createAt;
    @Column("file_url")
    private String fileUrl;
    @Column("milestone_id")
    private AggregateReference<Milestone, @NonNull Long> milestoneId;

    //1:N 관계, idColumn : 자식 엔티티가 가지는 외래키 keyColumn : 자식 엔티티의 기본키
    @MappedCollection(idColumn = "issue_id", keyColumn = "id")
    @Builder.Default
    private Set<Assignee> assignees = new HashSet<>();

    @MappedCollection(idColumn = "issue_id", keyColumn = "id")
    @Builder.Default
    private Set<IssueLabel> issueLabels = new HashSet<>();

    public static Issue create(Long writerId, String title, String description, String fileUrl, Long milestoneId) {
        AggregateReference<Milestone, @NonNull Long> milestoneParam
                = milestoneId == null ? null: AggregateReference.to(milestoneId);
        return Issue.builder()
                .writerId(AggregateReference.to(writerId))
                .title(title)
                .description(description)
                .isOpen(true)
                .createAt(LocalDateTime.now())
                .fileUrl(fileUrl)
                .milestoneId(milestoneParam)
                .build();
    }

    // milestoneId 삭제전 해당 값 -> null
    public void setMilestoneId(AggregateReference<Milestone, @NonNull Long> milestoneId) {
        this.milestoneId = milestoneId;
    }

}

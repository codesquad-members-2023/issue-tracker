package team01.issuetracker.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;
import team01.issuetracker.service.dto.response.MilestoneDTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


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
    private LocalDate dueDate;

    @MappedCollection(idColumn = "milestone_id", keyColumn = "id")
    @Builder.Default
    private List<Issue> issues = new ArrayList<>();

    public static Milestone create(MilestoneDTO milestoneDTO) {
        return Milestone.builder()
                .title(milestoneDTO.getTitle())
                .description(milestoneDTO.getDescription())
                .dueDate(milestoneDTO.getDueDate())
                .isOpen(true)
                .build();
    }

    public Milestone update(MilestoneDTO milestoneDTO) {
        this.title = milestoneDTO.getTitle();
        this.description = milestoneDTO.getDescription();
        this.dueDate = milestoneDTO.getDueDate();
        return this;
    }

    public Milestone statusUpdate() {
        this.isOpen = !isOpen;
        return this;
    }

}

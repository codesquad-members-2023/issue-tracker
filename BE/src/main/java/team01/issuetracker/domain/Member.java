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
@Table("member")
public class Member {
    @Id
    @Column("id")
    private Long id;
    @Column("name")
    private String name;
    @Column("file_url")
    private String fileURL;
}
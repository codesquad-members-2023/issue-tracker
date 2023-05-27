package team01.issuetracker.service.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class Assignee {

    private final long id;
    private final String name;
    private final String imgUrl;
}

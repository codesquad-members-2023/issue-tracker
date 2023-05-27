package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.service.vo.Assignee;

@Getter
@Builder
@AllArgsConstructor
public class AssigneeDTO {

    private final long id;
    private final String name;
    private final String imgUrl;

    public static AssigneeDTO of(Assignee assignee) {
        return AssigneeDTO.builder()
                .id(assignee.getId())
                .name(assignee.getName())
                .imgUrl(assignee.getImgUrl())
                .build();
    }
}

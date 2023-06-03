package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.domain.Member;

@Getter
@Builder
@AllArgsConstructor
public class MemberDTO {

    private final long id;
    private final String name;
    private final String imgUrl;

    public static MemberDTO of(Member assignee) {
        return MemberDTO.builder()
                .id(assignee.getId())
                .name(assignee.getName())
                .imgUrl(assignee.getFileURL())
                .build();
    }
}

package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.service.vo.MilestoneVO;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class MilestoneDTO {

    private final Long id;
    private final String title;
    private final String description;
    private final LocalDate dueDate;
    private final Long openedIssue;
    private final Long closedIssue;

    public static MilestoneDTO of(MilestoneVO milestoneVO) {
        return MilestoneDTO.builder()
                .id(milestoneVO.getId())
                .title(milestoneVO.getTitle())
                .description(milestoneVO.getDescription())
                .dueDate(milestoneVO.getDueDate())
                .openedIssue(milestoneVO.getOpenedIssue())
                .closedIssue(milestoneVO.getClosedIssue())
                .build();
    }
}

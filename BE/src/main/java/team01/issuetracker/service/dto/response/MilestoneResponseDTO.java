package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import team01.issuetracker.service.vo.Count;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MilestoneResponseDTO {

    private final Count count;
    private final List<MilestoneDTO> milestones;
}

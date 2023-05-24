package team01.issuetracker.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class AssigneesResponseDTO {

    private final List<AssigneeDTO> assignees;
}

package team01.issuetracker.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team01.issuetracker.service.AssigneeService;
import team01.issuetracker.service.dto.response.AssigneesResponseDTO;

@Slf4j
@Tag(name = "Assignee", description = "담당자 관련 API")
@RequiredArgsConstructor
@RequestMapping("/api/assignees")
@RestController
public class AssigneeController {

    private final AssigneeService assigneeService;

    @GetMapping
    public ResponseEntity<AssigneesResponseDTO> assigneesView() {
        log.debug("담당자 조회");
        return ResponseEntity.ok(assigneeService.getAssignees());
    }
}

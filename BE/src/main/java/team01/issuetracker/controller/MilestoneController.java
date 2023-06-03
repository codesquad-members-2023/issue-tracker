package team01.issuetracker.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team01.issuetracker.service.MilestoneService;
import team01.issuetracker.service.dto.response.MilestoneDTO;
import team01.issuetracker.service.dto.response.MilestoneResponseDTO;

@Slf4j
@Tag(name = "Milestone", description = "마일스톤 관련 API")
@RequiredArgsConstructor
@RequestMapping("/api/milestones")
@RestController
public class MilestoneController {

    private final MilestoneService milestoneService;

    @Operation(summary = "마일스톤 목록 조회")
    @GetMapping
    public ResponseEntity<MilestoneResponseDTO> milestoneView(@RequestParam("isOpen") boolean status) {
        log.debug(status + " 마일스톤 조회");
        return ResponseEntity.ok(milestoneService.getMilestone(status));
    }

    @Operation(summary = "새로운 마일스톤 작성")
    @PostMapping
    public void create(@RequestBody MilestoneDTO milestoneDTO) {
        log.debug("마일스톤 생성");
        milestoneService.create(milestoneDTO);
    }

    @Operation(summary = "마일스톤 편집")
    @PatchMapping("/{milestoneId}")
    public void update(@RequestBody MilestoneDTO milestoneDTO, @PathVariable Long milestoneId) {
        log.debug("마일스톤 편집");
        milestoneService.update(milestoneDTO, milestoneId);
    }

    @Operation(summary = "마일스톤 상태 변경")
    @PatchMapping("/{milestoneId}/status")
    public void stateChanges(@PathVariable Long milestoneId) {
        log.debug("마일스톤 상태 반전");
        milestoneService.stateChanges(milestoneId);
    }

    @Operation(summary = "마일스톤 삭제")
    @DeleteMapping("/{milestoneId}")
    public void delete(@PathVariable Long milestoneId) {
        log.debug("마일스톤 삭제");
        milestoneService.delete(milestoneId);
    }

}

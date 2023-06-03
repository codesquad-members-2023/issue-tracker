package team01.issuetracker.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team01.issuetracker.service.LabelService;
import team01.issuetracker.service.dto.response.LabelDTO;
import team01.issuetracker.service.dto.response.LabelsResponseDTO;

@Slf4j
@Tag(name = "Label", description = "라벨 관련 API")
@RequiredArgsConstructor
@RequestMapping("/api/labels")
@RestController
public class LabelController {

    private final LabelService labelService;

    @GetMapping
    public ResponseEntity<LabelsResponseDTO> labelsView() {
        log.debug("전체 라벨 조회");
        return ResponseEntity.ok(labelService.getLabels());
    }

    @PostMapping
    public void create(@RequestBody LabelDTO labelDTO) {
        log.debug("라벨 생성");
        labelService.create(labelDTO);
    }

    @PatchMapping("/{labelId}")
    public void update(@RequestBody LabelDTO labelDTO, @PathVariable Long labelId) {
        log.debug("라벨 편집");
        labelService.update(labelDTO, labelId);
    }

    @DeleteMapping("/{labelId}")
    public void delete(@PathVariable Long labelId) {
        log.debug("라벨 삭제");
        labelService.delete(labelId);
    }

}

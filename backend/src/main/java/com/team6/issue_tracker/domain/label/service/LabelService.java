package com.team6.issue_tracker.domain.label.service;

import com.team6.issue_tracker.domain.issue.domain.Labeling;
import com.team6.issue_tracker.domain.label.domain.Label;
import com.team6.issue_tracker.domain.label.dto.LabelDto;
import com.team6.issue_tracker.domain.label.repository.LabelRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LabelService {

    private final LabelRepository labelRepository;

    public LabelService(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    public Map<Long, LabelDto> getAllLabels() {
        Map<Long, LabelDto> labels = new HashMap<>();
        labelRepository.findAllByIsDeletedFalse().forEach(l -> labels.put(l.getLabelIdx(), LabelDto.of(l)));
        return labels;
    }

    public Iterable<Label> findAllById(Collection<Labeling> values) {
        return labelRepository.findAllByLabelIdxInAndAndIsDeleted(values.stream()
                .map(Labeling::getLabelIdx)
                .collect(Collectors.toList()), false);
    }
}

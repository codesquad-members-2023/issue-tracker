package team01.issuetracker.service.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class Count {

    private final int label;
    private final int milestone;
    private final int opened;
    private final int closed;
}

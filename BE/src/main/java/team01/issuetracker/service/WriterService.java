package team01.issuetracker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team01.issuetracker.repository.MemberRepository;
import team01.issuetracker.service.dto.response.MemberDTO;
import team01.issuetracker.service.dto.response.WritersResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WriterService {
    private final MemberRepository memberRepository;

    public WritersResponseDTO getWriters() {
        List<MemberDTO> writers = memberRepository.findAll().stream()
                .map(MemberDTO::of)
                .collect(Collectors.toList());

        return WritersResponseDTO.builder()
                .writers(writers)
                .build();
    }
}

package team01.issuetracker.repository;

import org.springframework.data.repository.CrudRepository;
import team01.issuetracker.domain.Member;

import java.util.List;

public interface MemberRepository extends CrudRepository<Member, Long> {
    List<Member> findAll();
}

package team01.issuetracker.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import team01.issuetracker.domain.Label;

import java.util.List;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {
    List<Label> findAll();
}

package org.ntg.learn2code.api;

import org.ntg.learn2code.api.dto.DivisionDto;
import org.ntg.learn2code.repository.DivisionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/divisions")
public class DivisionController {

    private final DivisionRepository repo;

    public DivisionController(DivisionRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<DivisionDto> all() {
        return repo.findAll().stream()
                .map(d -> new DivisionDto(d.getId(), d.getName(), d.getDescription()))
                .toList();
    }
}

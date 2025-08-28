    package org.ntg.learn2code.web;

    import lombok.RequiredArgsConstructor;
    import org.ntg.learn2code.repository.CourseRepository;
    import org.ntg.learn2code.repository.DivisionRepository;
    import org.ntg.learn2code.api.dto.CourseDto;
    import org.ntg.learn2code.api.dto.DivisionDto;
    import org.springframework.data.domain.Sort;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api")
    @RequiredArgsConstructor
    public class CatalogController {

        private final DivisionRepository divisionRepo;
        private final CourseRepository courseRepo;

        @GetMapping(value = "/divisions", produces = MediaType.APPLICATION_JSON_VALUE)
        @Transactional(readOnly = true)
        public List<DivisionDto> getDivisions() {
            return divisionRepo.findAll(Sort.by("id")).stream()
                    .map(d -> new DivisionDto(d.getId(), d.getName(), d.getDescription()))
                    .toList();
        }

        @GetMapping("/divisions/{id}")
        @Transactional(readOnly = true)
        public ResponseEntity<DivisionDto> getDivision(@PathVariable Long id) {
            return divisionRepo.findById(id)
                    .map(d -> new DivisionDto(d.getId(), d.getName(), d.getDescription()))
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        @GetMapping("/divisions/{id}/courses")
        @Transactional(readOnly = true)
        public ResponseEntity<List<CourseDto>> getDivisionCourses(@PathVariable Long id) {
            if (!divisionRepo.existsById(id)) return ResponseEntity.notFound().build();

            var courses = courseRepo.findByDivisionIdAndIsActiveTrue(id).stream()
                    .map(c -> new CourseDto(c.getId(), c.getTitle(), c.getDescription(), c.getBasePrice()))
                    .toList();
            return ResponseEntity.ok(courses);
        }

        @GetMapping("/courses/{id}")
        @Transactional(readOnly = true)
        public ResponseEntity<CourseDto> getCourse(@PathVariable Long id) {
            return courseRepo.findById(id)
                    .map(c -> new CourseDto(c.getId(), c.getTitle(), c.getDescription(), c.getBasePrice()))
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
    }

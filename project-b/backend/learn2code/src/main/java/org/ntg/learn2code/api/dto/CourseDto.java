package org.ntg.learn2code.api.dto;

import java.math.BigDecimal;

public record CourseDto(Long id, String title, String description, BigDecimal basePrice) {}

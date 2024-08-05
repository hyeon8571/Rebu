package com.rebu.common.util;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class ListUtils {
    public static <T, U> List<U> applyFunctionToElements(List<T> list, Function<T, U> func) {
        return list.stream().map(func).collect(Collectors.toList());
    }
}
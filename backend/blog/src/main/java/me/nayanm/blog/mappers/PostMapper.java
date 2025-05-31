package me.nayanm.blog.mappers;

import me.nayanm.blog.domain.CreatePostRequest;
import me.nayanm.blog.domain.UpdatePostRequest;
import me.nayanm.blog.domain.dtos.CreatePostRequestDto;
import me.nayanm.blog.domain.dtos.PostDto;
import me.nayanm.blog.domain.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    @Mapping(target = "category", source = "category")
    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "author", source = "author")
    PostDto toDto(Post post);

    CreatePostRequest toCreatePostRequest(CreatePostRequestDto createPostRequestDto);

    UpdatePostRequest toUpdatePostRequest(UpdatePostRequest updatePostRequestDto);
}

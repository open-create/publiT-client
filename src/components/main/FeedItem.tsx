import { VStack, Text, Box, HStack } from '@chakra-ui/react';

interface Props {
  title: string;
  author: string;
  date: string;
  thumbnail?: string;
  compact?: boolean; // side-feed 용
  showTopBorder?: boolean;
  content?: string; // 메인 피드용 내용 미리보기
}

export default function FeedItem({
  title,
  author,
  date,
  thumbnail,
  compact,
  showTopBorder = true,
  content,
}: Props) {
  return (
    <Box
      borderTop={showTopBorder ? '1px solid' : 'none'}
      borderColor="blue.200"
      pt={showTopBorder ? '4' : '0'}
    >
      {compact ? (
        // 사이드 피드: 썸네일, 제목, 작성자 프사, 닉네임, 작성 날짜
        <HStack align="start" gap="3">
          {thumbnail && <Box w="12" h="12" bg="gray.200" rounded="md" />}
          <VStack align="start" flex="1" gap="1">
            <Text
              fontSize="0.875rem" // 14px
              fontWeight="medium"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Text>
            {/* 사이드 피드의 작성자 프사 부분 */}
            <HStack fontSize="xs" color="gray.500" gap="2">
              <Box
                w="3"
                h="3"
                borderRadius="full"
                bg="gray.300"
                position="relative"
                overflow="hidden"
              >
                {/* TODO: 추후 Next.js Image 컴포넌트로 교체 */}
                {/* <Image 
                     src={authorAvatar || '/default-avatar.png'}
                     alt={`${author}의 프로필`}
                     fill
                     style={{ objectFit: 'cover' }}
                   /> */}
              </Box>
              <Text>{author}</Text>
              <Text>{date}</Text>
            </HStack>
          </VStack>
        </HStack>
      ) : (
        // 메인 피드 부분 수정
        <HStack align="start" gap="4" w="100%">
          {/* 왼쪽: 프로필 사진 */}
          <Box
            w="12"
            h="12"
            borderRadius="full"
            bg="gray.300"
            flexShrink="0"
            position="relative"
            overflow="hidden"
          >
            {/* TODO: 추후 Next.js Image 컴포넌트로 교체 */}
            {/* <Image 
                 src={authorAvatar || '/default-avatar.png'}
                 alt={`${author}의 프로필`}
                 fill
                 style={{ objectFit: 'cover' }}
               /> */}
          </Box>

          {/* 오른쪽: 콘텐츠 영역 */}
          <VStack align="start" gap="2" flex="1">
            {/* 닉네임, 작성 날짜 */}
            <VStack align="start" gap="0">
              <Text fontSize="s" fontWeight="bold">
                {author}
              </Text>
              <Text fontSize="s" color="gray.500">
                {date}
              </Text>
            </VStack>

            {/* 제목 */}
            <Text fontSize="sm" fontWeight="bold" lineHeight="1.4">
              {title}
            </Text>

            {/* 내용 미리보기 */}
            <Text fontSize="s" lineHeight="1.6" color="gray.800">
              {content}
            </Text>

            {/* 썸네일 */}
            {thumbnail && (
              <Box w="80" h="48" bg="gray.200" rounded="lg" position="relative" overflow="hidden">
                {/* TODO: 추후 Next.js Image 컴포넌트로 교체 */}
                {/* <Image 
                     src={thumbnail}
                     alt={title}
                     fill
                     style={{ objectFit: 'cover' }}
                   /> */}
              </Box>
            )}
          </VStack>
        </HStack>
      )}
    </Box>
  );
}

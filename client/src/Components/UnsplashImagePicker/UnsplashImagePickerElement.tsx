import { Flex, Image, Tooltip } from "@chakra-ui/react";

interface UnsplashImagePickerElementProps {
    element: any;
    selected: any;
    select: (arg: any) => void;
}

export function UnsplashImagePickerElement(
    props: UnsplashImagePickerElementProps
) {
    return (
        <Flex key={props.element.id}>
            <Tooltip label={props.element.user.name}>
                <Image
                    className="img-hover-effect"
                    src={props.element.urls.small}
                    borderColor={
                        props.selected?.id === props.element.id
                            ? "blue.300"
                            : "transparent"
                    }
                    borderStyle="solid"
                    borderWidth="2px"
                    cursor="pointer"
                    transform={
                        props.selected?.id === props.element.id
                            ? "scale(1.1)"
                            : undefined
                    }
                    borderRadius={5}
                    w="100%"
                    onClick={() => {
                        props.select({
                            id: props.element.id,
                            url: props.element.urls.full,
                            icon: props.element.urls.small,
                        });
                    }}
                ></Image>
            </Tooltip>
        </Flex>
    );
}

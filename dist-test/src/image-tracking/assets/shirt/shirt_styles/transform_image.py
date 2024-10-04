from PIL import Image

def cut_and_rotate_image(image_path, output_path):
    """
    Cuts the image into four equal parts, rotates each part 180 degrees,
    and combines them back into a single image.

    :param image_path: str, path to the input image.
    :param output_path: str, path to save the transformed image.
    """
    # Open the image
    image = Image.open(image_path)
    width, height = image.size
    
    # Calculate the dimensions of each part
    mid_width = width // 2
    mid_height = height // 2

    # Cut the image into four parts
    top_left = image.crop((0, 0, mid_width, mid_height))
    top_right = image.crop((mid_width, 0, width, mid_height))
    bottom_left = image.crop((0, mid_height, mid_width, height))
    bottom_right = image.crop((mid_width, mid_height, width, height))
    
    # Rotate each part 180 degrees
    top_left = top_left.rotate(-180)
    top_right = top_right.rotate(-180)
    bottom_left = bottom_left.rotate(-180)
    bottom_right = bottom_right.rotate(-180)

    # Create a new blank image to combine the rotated parts
    new_image = Image.new('RGB', (width, height))

    # Paste the rotated parts back into the new image
    new_image.paste(top_left, (0, 0))
    new_image.paste(top_right, (mid_width, 0))
    new_image.paste(bottom_left, (0, mid_height))
    new_image.paste(bottom_right, (mid_width, mid_height))

    # Save the combined image
    new_image.save(output_path)
    print(f"Image saved to {output_path}")

if __name__ == "__main__":
    # Example usage
    image_path = 'test.png'  # Replace with your image path
    flip_type = 'horizontal'        # Choose 'horizontal' or 'vertical'
    output_path = 'Cotton_Oxford_FRONT_6085305_baseColor.jpeg'  # Path to save the flipped image

    cut_and_rotate_image(image_path, output_path)
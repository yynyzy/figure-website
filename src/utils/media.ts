class Media {
  static getUserMedia = async (config: MediaStreamConstraints): Promise<MediaStream> => {
    const stream = await navigator.mediaDevices.getUserMedia(config);
    return stream;
  }
}

export default Media;

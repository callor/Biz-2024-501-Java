type KoscajNewsItem = {
  title: string;
  link: string;
  description: string;
  author: string;
  pubDate: string;
};
type KoscajNews = {
  rss: {
    channel: {
      title: string;
      link: string;
      description: string;
      language: string;
      copyright: string;
      lastBuildDate: string;
      item: KoscajNewsItem[];
    };
  };
};

type YN = 'Y' | 'N';

type FcmBaseParam = {
  notification: {
    title: string;
    body: string;
    imageUrl?: string;
  };
  data?: {
    [key: string]: string;
  };
};

interface FcmPushTarget extends FcmBaseParam {
  targets: string[];
}

interface FcmPushTopic extends FcmBaseParam {
  topic: string;
}

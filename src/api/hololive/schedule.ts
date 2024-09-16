import type { LiverEvent } from "..";
import { getChannelIcon } from "@/utils/icons";

const holoAPI = "https://schedule.hololive.tv/api/list/7";

export interface HoloSchedule {
  dateGroupList: HoloDateGroup[];
}
export interface HoloDateGroup {
  displayDate: string;
  datetime: string;
  videoList: HoloVideoDetail[];
}

export interface HoloVideoDetail {
  displayDate: string;
  datetime: string;
  isLive: boolean;
  platformType: number;
  url: string;
  thumbnail: string;
  title: string;
  name: string;
  talent: HoloTelent;
  collaboTalents: HoloTelent[];
}

export interface HoloTelent {
  name: string;
  iconImageUrl: string;
}

function getData(): Promise<HoloSchedule> {
  if (import.meta.env.VITE_TEST_DATA) {
    return import("./sample4.json").then((res) => res.default);
  }
  return fetch(holoAPI).then((res) => res.json());
}

export async function getHoloEvents(): Promise<LiverEvent[]> {
  const data = await getData();

  const wholeVideoList = data.dateGroupList.map((dateGroup) => dateGroup.videoList).flat();

  const events: LiverEvent[] = wholeVideoList.map((video) => {
    return {
      affilication: "hololive",
      startAt: new Date(video.datetime),
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      endAt: null,
      isLive: video.isLive,
      talent: {
        name: video.talent.name,
        image: getChannelIcon(video.talent.name),
      },
      collaboTalents: video.collaboTalents.map((collaboTalent) => {
        return {
          name: collaboTalent.name,
          image: getChannelIcon(collaboTalent.name),
        };
      }),
    };
  });
  return events;
}

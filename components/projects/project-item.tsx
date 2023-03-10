import Image from "next/image";

export default function ProjectItem({ data }: any) {
    const title = data.properties.이름.title[0].plain_text;
    const githubLink = data.properties.Github.url;
    const description = data.properties.설명.rich_text[0].plain_text;
    const imageSrc = data.cover.file?.url || data.cover.external.url;
    const tags = data.properties.태그.multi_select;
    const start = data.properties.Period.date.start;
    const end = data.properties.Period.date.end;

    const calculatedPeriod = (start: any, end: any) => {
        const startDateStringArray = start.split("-");
        const endDateStringArray = start.split("-");

        let startDate = new Date(
            startDateStringArray[0],
            startDateStringArray[1],
            startDateStringArray[2]
        );
        let endDate = new Date(
            endDateStringArray[0],
            endDateStringArray[1],
            endDateStringArray[2]
        );

        const diffInMs = Math.abs(Number(endDate) - Number(startDate));
        const result = diffInMs / (1000 * 60 * 60 * 24);

        return result;
    };

    return (
        <div className="project-card">
            <Image
                className="rounded-t-xl"
                src={imageSrc}
                width={100}
                height={60}
                layout="responsive"
                objectFit="cover"
                quality={100}
                alt="cover image"
            />
            <div className="p-4 flex flex-col">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="mt-4 text-xl">{description}</p>
                <a href={githubLink}>깃허브 바로가기</a>
                <p className="my-1">
                    작업기간 : {start} ~ {end} ({calculatedPeriod(start, end)}
                    일)
                </p>

                <div className="flex items-start mt-2">
                    {tags.map((tag: any) => (
                        <h1
                            className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 w-30"
                            key={tag.id}
                        >
                            {tag.name}
                        </h1>
                    ))}
                </div>
            </div>
        </div>
    );
}

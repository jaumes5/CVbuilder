class ExperienceHandler:
    def __init__(self, experiences: list[dict]):
        self.experiences = experiences
        self.flatten_experiences = self.flatten_and_lower()

    def apply_filter(self, filter_exp: str, html_format: bool = True):
        if not filter_exp or all(not filter_str.strip() for filter_str in filter_exp):
            return (
                self.experiences
                if not html_format
                else self.cast_to_html(self.experiences)
            )
        ele_to_inspect = set(range(len(self.experiences)))
        for filter_str in filter_exp:
            filter_str = filter_str.strip().lower()
            if not filter_str:
                continue
            tmp_set = set()
            for index in ele_to_inspect:
                if filter_str in self.flatten_experiences[index]:
                    tmp_set.add(index)
            ele_to_inspect = ele_to_inspect.intersection(tmp_set)
            if not ele_to_inspect:
                break
        res = [self.experiences[i] for i in sorted(ele_to_inspect)]
        return res if not html_format else self.cast_to_html(res)

    def flatten_and_lower(self) -> list[str]:
        return [
            "".join(
                ele.lower() if isinstance(ele, str) else str(ele).lower()
                for ele in experience.values()
            )
            for experience in self.experiences
        ]

    @staticmethod
    def cast_to_html(experiences):
        def get_techs(techs, parent_idx: int):
            return "\n".join(
                f"""<li {"class='background secondary'" if (pos + parent_idx) %2 == 1 else "class='background tertiary'"} title="Click to add to filter" onclick="addToFilter(\'{tech}\')"> {tech} </li>"""
                for pos, tech in enumerate(techs)
            )

        return [
            f"""{"<li class='background secondary'>" if pos%2 == 0 else "<li class='background tertiary'>"}
            <h4 class="primary">{ job["title"] }</h4>
            <p class="quaternary">{ job["company"] }</p>
            <p class="quinary">{ job["dates"] }</p>
            <p class="senary">{ job["description"] }</p>
            <p class="quaternary">Technologies/Frameworks used:</p>
            <ul class="technologies">
                {get_techs(job["technologies"], pos)}
            </ul>
            </li>"""
            for pos, job in enumerate(experiences)
        ]

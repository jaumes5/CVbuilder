class ExperienceHandler:
    def __init__(self, experiences: list[dict]):
        self.experiences = experiences
        self.flatten_experiences = self.flatten_and_lower()

    def apply_filter(self, filter_exp: str, html_format: bool = True):
        """
        Apply a filter to the experiences.

        If the filter is empty or all of its elements are empty, return
        the original list of experiences. Otherwise, filter the
        experiences by applying each element of the filter as a
        substring search on the flattened experiences.

        Args:
            filter_exp (list[str]): The list of strings to search for in
                the flattened experiences.
            html_format (bool): If true, format the result as HTML.

        Returns:
            list[dict]: The filtered list of experiences. If html_format is
                true, the experiences are formatted as HTML.
        """
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
        """
        Return a list of strings, where each string is a flattened version of an
        experience. The strings are flattened by joining all the values of the
        experience, and then converting the result to lowercase.

        Returns:
            list[str]: A list of strings, where each string is a flattened
                version of an experience.
        """
        return [
            "".join(
                ele.lower() if isinstance(ele, str) else str(ele).lower()
                for ele in experience.values()
            )
            for experience in self.experiences
        ]

    @staticmethod
    def cast_to_html(experiences):
        """
        Cast a list of experiences to a list of HTML strings.

        The method takes a list of experiences, where each experience is a
        dictionary with the keys "title", "company", "dates", "description",
        and "technologies". The method returns a list of strings, where each
        string is a rendered HTML version of an experience.

        Args:
            experiences (list[dict]): The list of experiences to render.

        Returns:
            list[str]: The list of rendered experiences as HTML strings.
        """
        def get_techs(techs, parent_idx: int):
            return "\n".join(
                f"""<li {"class='blur-shadow-emulation-secondary'> <div class='background-secondary senary'" if (pos + parent_idx) %2 == 1 
                else "class='blur-shadow-emulation-tertiary'> <div class='background-tertiary senary'"} 
                title="Click to add to filter" onclick="addToFilter(\'{tech}\')"> {tech} </div> </li>"""
                for pos, tech in enumerate(techs)
            )

        return [
            f"""{"<li class='blur-shadow-emulation-secondary'> <div class='background-secondary'>" if pos%2 == 0 
            else "<li class='blur-shadow-emulation-tertiary'> <div class='background-tertiary'>"}
            <h4 class="primary">{ job["title"] }</h4>
            <p class="quaternary">{ job["company"] }</p>
            <p class="quinary">{ job["dates"] }</p>
            <p class="senary">{ job["description"] }</p>
            <p class="quaternary">Tech stack:</p>
            <ul class="technologies">
                {get_techs(job["technologies"], pos)}
            </ul>
            </div>
            </li>"""
            for pos, job in enumerate(experiences)
        ]

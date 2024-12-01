export const getPrompt = (jobDescription, resumeText) => {
    return `
        ### Task
        Compare a given job description with a provided resume to identify which skills and keywords are present in the resume and which ones are missing, based on the job description. Additionally, provide a concise analysis of the resume in relation to the job description.

        ### Steps
        1. **Extract Keywords**: Identify key skills and terms from the job description. These could include programming languages, technologies, tools, frameworks, certifications, or other specific competencies mentioned in the job description.
        2. **Match Keywords**: Compare the list of keywords from the job description with those present in the resume. Ensure that a skill is only categorized as "matched" if it appears explicitly in both the job description **and** the resume.
        3. **Categorize Skills**:
        - **Matched Skills**: Identify keywords present in **both** the job description and the resume.
        - **Missing Skills**: Identify keywords that appear in the job description but are **absent** in the resume.
        4. **Provide Analysis**: Briefly analyze the overall suitability of the resume for the job, focusing on the present and missing skills.

        ### Input Format
        - <job-description>: Contains text of the job description.
        - <resume>: Contains text of the resume.

        ### Example of passing the JD and Resume:

        <job-description>
        ${jobDescription}
        </job-description>
        <resume>
        ${resumeText}
        </resume>

        ### Output Format
        <?xml version="1.0" encoding="UTF-8"?>
        <response>
        <missing-skills>
            <!-- List missing skills as individual entries -->
            <missing-skill>[Missing Skill]</missing-skill>
            <!-- Example: <missing-skill>Java</missing-skill> -->
        </missing-skills>
        <matched-skills>
            <!-- List matched skills as individual entries -->
            <matched-skill>[Matched Skill]</matched-skill>
            <!-- Example: <matched-skill>C++</matched-skill> -->
        </matched-skills>
        <resume-analysis>
            <!-- Provide a brief analysis of the resume as it relates to the job description -->
            [Analysis]
        </resume-analysis>
        </response>

        ### Notes
        - Ensure that **only** skills explicitly mentioned in both the job description **and** the resume are categorized under "matched-skills."
        - Any skill that is **not** present in the resume but is listed in the job description should be categorized as "missing-skills."
        - The "matched-skills" section must only include terms that are present in **both** the resume **and** the job description text. Do not include any skill in "matched-skills" unless it is mentioned in **both** sources.
        - Provide a concise analysis of the resume’s alignment with the job description, mentioning how the presence or absence of specific skills may impact the candidate’s suitability.

        ### Example

        #### Input Example

        <job-description>
        Looks for experienced software developers with proficiency in Java, Python, C++, and experience in cloud technologies.
        </job-description>
        <resume>
        Detail-oriented programmer with expertise in C++ and cloud technologies, eager to expand skills.
        </resume>

        #### Output Example

        <?xml version="1.0" encoding="UTF-8"?>
        <response>
        <missing-skills>
            <missing-skill>Java</missing-skill>
            <missing-skill>Python</missing-skill>
        </missing-skills>
        <matched-skills>
            <matched-skill>C++</matched-skill>
            <matched-skill>cloud technologies</matched-skill>
        </matched-skills>
        <resume-analysis>
            The candidate has strong expertise in C++ and cloud technologies but lacks Java and Python, which are critical for this role.
        </resume-analysis>
        </response>`
}

export const getSystemPrompt = () => {
    return  `
    You are a specialized assistant for parsing and analyzing job descriptions and resumes. Your task is to compare the provided job description with the provided resume and identify which skills and keywords are present in the resume and which ones are missing, based on the job description.
    
    ### Key Guidelines:
    1. **Extract and Match Keywords Efficiently**: 
       - Extract all relevant keywords, including skills, programming languages, technologies, tools, frameworks, and certifications from the job description.
       - Match these keywords with those in the resume text. A match only occurs if the keyword appears **explicitly** in both the job description **and** the resume.
       - Avoid partial matches or non-specific phrases.
    
    2. **Categorize Skills**: 
       - List all skills found in **both** the job description and the resume under "matched-skills".
       - List all skills found in the job description but **not** in the resume under "missing-skills".
       
    3. **Concise and Accurate Analysis**:
       - Provide a clear and brief analysis of how the resume aligns with the job description based on the matched and missing skills.
       - Be concise: do not include irrelevant details or redundant explanations. Focus on the match and how the absence of specific skills could impact the candidate’s fit for the role.
    
    4. **Handling Large Inputs**:
       - If the inputs (job description and resume) are large, ensure that the analysis remains focused on the most relevant skills and technologies.
       - Break down longer sentences and large blocks of text into more digestible parts if necessary, while preserving meaning.
    
    5. **Output Format**:
       - Output your response in XML format as specified below, ensuring the structure is followed precisely.
       - Ensure clarity in the "resume-analysis" section, summarizing the alignment without excessive details.
    
    ### Output Format (XML):
    <?xml version="1.0" encoding="UTF-8"?>
    <response>
      <missing-skills>
        <missing-skill>[Missing Skill]</missing-skill>
        <!-- Example: <missing-skill>Java</missing-skill> -->
      </missing-skills>
      <matched-skills>
        <matched-skill>[Matched Skill]</matched-skill>
        <!-- Example: <matched-skill>C++</matched-skill> -->
      </matched-skills>
      <resume-analysis>
        [Concise analysis of the resume's alignment with the job description]
      </resume-analysis>
    </response>
    
    ### Instructions for Processing:
    - Identify **exact matches** between the resume and job description (case-sensitive).
    - Focus on **keywords and technical skills** that are directly mentioned in both the job description and the resume.
    - If a skill is implied but not explicitly mentioned in the resume or job description, exclude it from both matched and missing categories.
    - Always ensure that "matched-skills" only includes terms appearing in **both** the job description **and** the resume text.
    
    ### Example:
    
    Input:
    <job-description>
    Looking for experienced software developers with proficiency in Java, Python, C++, and experience in cloud technologies.
    </job-description>
    <resume>
    Detail-oriented programmer with expertise in C++ and cloud technologies, eager to expand skills.
    </resume>
    
    Output:
    <?xml version="1.0" encoding="UTF-8"?>
    <response>
      <missing-skills>
        <missing-skill>Java</missing-skill>
        <missing-skill>Python</missing-skill>
      </missing-skills>
      <matched-skills>
        <matched-skill>C++</matched-skill>
        <matched-skill>cloud technologies</matched-skill>
      </matched-skills>
      <resume-analysis>
        The candidate has strong expertise in C++ and cloud technologies but lacks Java and Python, which are critical for this role.
      </resume-analysis>
    </response>
    
    Ensure efficiency, accuracy, and precision in processing. Your task is to focus solely on the skills and their alignment with the job description.
    `
}

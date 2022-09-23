        <% if (course.jobList.length) { %>
            <ul>
                <% course.jobList.forEach(job => { %>
                    <li><%= course.jobList.title %></li>
                    <% })
                %>
            </ul>
            <%} else { %> 
                <p> Add some jobs to this class to get started.</p>
            <%}
        %> 